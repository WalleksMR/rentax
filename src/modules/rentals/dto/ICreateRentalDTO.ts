export interface ICreateRentalDTO {
  id?: string;
  total?: number;
  end_date?: Date;
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}
