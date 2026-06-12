import {
  MovimentationPopulated,
  MovimentationStatus,
  DepartamentState,
  ProductionFlowTemplatePopulated,
  ProductionPopulated,
} from "@/types/database.type";

type ProcessStatusData = {
  production: ProductionPopulated;
  movimentations: MovimentationPopulated[];
  flowTemplates: ProductionFlowTemplatePopulated[];
};

export function calcDepartamentState({
  production,
  flowTemplates,
  movimentations,
}: ProcessStatusData) {
  const states: DepartamentState[] = [];
  const lastDepartament = flowTemplates[flowTemplates.length - 1].departament;

  // Agrupamento por processo
  const inputMovimentationsMap = new Map<number, MovimentationPopulated[]>();
  const outputMovimentationsMap = new Map<number, MovimentationPopulated[]>();

  // =========================
  // ORGANIZA EXECUÇÕES
  // =========================

  for (const movimentation of movimentations) {
    // ENTRADA
    if (movimentation.departament) {
      const departamentId = movimentation.departament.id;

      const current = inputMovimentationsMap.get(departamentId) || [];

      current.push(movimentation);

      inputMovimentationsMap.set(departamentId, current);
    }

    // SAÍDA
    if (movimentation.from_departament) {
      const departamentId = movimentation.from_departament.id;

      const current = outputMovimentationsMap.get(departamentId) || [];

      current.push(movimentation);

      outputMovimentationsMap.set(departamentId, current);
    }
  }

  // =========================
  // CALCULA ESTADOS
  // =========================

  for (let i = 0; i < flowTemplates.length; i++) {
    const template = flowTemplates[i];

    const currentDepartament = template.departament;

    const departamentId = currentDepartament.id;

    const inputMovimentations = inputMovimentationsMap.get(departamentId) || [];

    const outputMovimentations = outputMovimentationsMap.get(departamentId) || [];

    const movimentations = [...inputMovimentations, ...outputMovimentations];

    // =========================
    // QUANTIDADES
    // =========================

    const inputAmount = inputMovimentations.reduce((total, exe) => total + exe.amount, 0);

    const forwardAmount = outputMovimentations
      .filter((exe) => exe.type === "TRANSFER")
      .reduce((total, exe) => total + exe.amount, 0);

    const externalAmount = outputMovimentations
      .filter((exe) => exe.type === "EXTERNAL")
      .reduce((total, exe) => total + exe.amount, 0);

    const reprocessAmount = outputMovimentations
      .filter((exe) => exe.type === "REPROCESS")
      .reduce((total, exe) => total + exe.amount, 0);

    const outputAmount = forwardAmount + externalAmount + reprocessAmount;

    const avaliableAmount = inputAmount - forwardAmount - externalAmount - reprocessAmount;

    // =========================
    // STATUS BASE
    // =========================

    const hasMovimentations = inputMovimentations.length > 0 || outputMovimentations.length > 0;

    const isInitialMovimentation =
      movimentations && movimentations.length === 1 && movimentations[0].type === "INIT";

    const isLastDepartament = currentDepartament.id === lastDepartament.id;

    let status: MovimentationStatus = "PENDING";

    if (!hasMovimentations || isInitialMovimentation) {
      status = "PENDING";
    } else if (isLastDepartament && avaliableAmount === production.amount) {
      status = "SUCCESS";
    } else if (avaliableAmount > 0) {
      status = "IN_PROGRESS";
    } else {
      status = "SUCCESS";
    }

    // =========================
    // FLAGS
    // =========================

    const hasExternal = externalAmount > 0;

    const hasReprocess = reprocessAmount > 0;

    const hasPendingExternal = externalAmount > forwardAmount;

    const hasPendingReprocess = reprocessAmount > forwardAmount;

    const fullyExternal = externalAmount > 0 && forwardAmount === 0 && avaliableAmount === 0;

    const fullyReprocessed = reprocessAmount > 0 && forwardAmount === 0 && avaliableAmount === 0;

    const partiallyExternal = externalAmount > 0 && forwardAmount > 0;

    const partiallyReprocessed = reprocessAmount > 0 && forwardAmount > 0;

    // =========================
    // STATUS AVANÇADO
    // =========================

    if (fullyExternal) {
      status = "EXTERNAL";
    }

    if (fullyReprocessed) {
      status = "REPROCESSING";
    }

    // =========================
    // PROCESSOS RELACIONADOS
    // =========================
    const previousDepartament = i > 0 ? flowTemplates[i - 1].departament : null;
    const nextDepartament = i < flowTemplates.length - 1 ? flowTemplates[i + 1].departament : null;

    // =========================
    // PUSH
    // =========================

    states.push({
      departament: currentDepartament,

      production,

      flowTemplates,

      template,

      previousDepartament,

      nextDepartament,

      status,

      // QUANTIDADES
      inputAmount,

      outputAmount,

      forwardAmount,

      externalAmount,

      reprocessAmount,

      avaliableAmount,

      // EXECUÇÕES
      inputMovimentations,

      outputMovimentations,

      movimentations: [...inputMovimentations, ...outputMovimentations],

      // FLAGS
      flags: {
        hasExternal,

        hasPendingExternal,

        partiallyExternal,

        hasReprocess,

        hasPendingReprocess,

        partiallyReprocessed,
      },
    });
  }

  // =========================
  // PROCESSOS PULADOS
  // =========================

  checkSkippedDepartaments(states);

  return states;
}

export function checkSkippedDepartaments(departamentStates: DepartamentState[]) {
  for (let i = 0; i < departamentStates.length; i++) {
    const current = departamentStates[i];

    const hasmovimentations = current.movimentations.length > 0;

    if (hasmovimentations) continue;

    const afterStates = departamentStates.slice(i + 1);

    const hasFlowAdvanced = afterStates.some((state) => state.movimentations.length > 0);

    if (hasFlowAdvanced) {
      current.status = "SKIPPED";
    }
  }
}
