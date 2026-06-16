export const DESC = {
  deadline: {
    valid: "Prazo ainda não expirou",
    expired: "Prazo expirado",
    completed: "Prazo finalizado",
    notDefined: "Nenhum prazo definido",
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
