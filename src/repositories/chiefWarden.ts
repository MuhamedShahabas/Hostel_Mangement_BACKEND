import { AuthService, AuthRoles } from "../services/auth";
import { ChiefWardenModel } from "../models/chiefWarden/chiefWarden";
import { IChiefWarden } from "../interfaces/IChiefWarden";

export class CWAuthRepo extends AuthService {
  public role: AuthRoles = "chief warden";
  async find(email: string): Promise<IChiefWarden | null> {
    return await ChiefWardenModel.findOne({ email });
  }
}