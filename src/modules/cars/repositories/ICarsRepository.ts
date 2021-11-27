import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { IListCarAvailable } from '../dto/IListCarAvailable';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create({
    id,
    name,
    description,
    brand,
    daily_rate,
    fine_amount,
    license_plate,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;
  findByAvailable({
    name,
    brand,
    category_id,
  }: IListCarAvailable): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
