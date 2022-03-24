// TODO implement validation
import { OperationsRepository } from '../types';

export type ValidationResult = [boolean, []];

export const validate = (_payload: OperationsRepository): ValidationResult => {
  return [true, []];
};
