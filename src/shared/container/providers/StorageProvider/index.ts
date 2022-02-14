import { container } from 'tsyringe';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const disStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  disStorage[process.env.DISK_STORAGE]
);
