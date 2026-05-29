export interface Incident {
  id: string;
  service: string;
  severity: string;
  status: string;
  assigneeName: string | null;
  createdAt: string;
}
