export interface Departments {
  id: number;
  departmentName: string;
}
export interface RelatedServices {
  id: number;
  relatedServicesName: string;
}

export interface Prioriry {
  id: number;
  priorityName: string;
}

export interface Ticket {
  departments: Departments[];
  relatedServices: RelatedServices[];
  priority: Prioriry[];
  loading: {
    sendTicket: boolean;
  };
  errors: {
    sendTicket: null | string;
  };
}
