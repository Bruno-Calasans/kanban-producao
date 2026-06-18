export const DESC = {
  deadline: {
    inProgress: "Prazo ainda não expirou",
    expired: "Prazo expirado",
    completed: "Prazo finalizado sem atraso",
    notDefined: "Nenhum prazo definido",
    reopen: "Prazo reaberto para edição",
    notReady: "Ainda não recebeu quantidade",
    completedExpired: "Prazo concluído com atraso",
  },
  production: {
    pending: "Produção aguardando início",
    inProgress: "Produção em andamento",
    cancelled: "Produção foi cancelada",
    reprocessing: "Produção está sendo reprocessada",
    completed: "Produção concluída",
  },
  departament: {
    pending: "Departamento aguardando início",
    inProgress: "Departamento em progresso",
    inProgressWithReprocess: "Departamento em progresso com reprocesso",
    skipped: "Departamento foi pulado",
    reprocess: "Departamento sendo reprocessado",
    external: "Enviado para departamento externo",
    completed: "Departamento finalizado",
    completedWithReprocess: "Departamento finalizado com reprocesso",
  },
} as const;
