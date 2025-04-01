export interface allotment {
  allotment_id?: number;
  user_id: number;
  user_name?: string;
  flat_id: number;
  flat_no?: string;
  block_no?: string;
  flat_type?: string;
  start_date: string;
  end_date?: string | null;
}
