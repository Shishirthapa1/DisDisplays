export interface CreateContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CreateContactResponse {
  success: boolean;
  message: string;
}
