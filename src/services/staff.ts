import { StaffRepo } from "../repositories/staff";
import { Department, IStaff } from "../interfaces/staff";
import ErrorResponses from "../error/ErrorResponses";

export class StaffService extends StaffRepo {
  // Get all staffs' data
  async allStaffs(filter?: Object): Promise<IStaff[]> {
    const data = await this.allStaffsByFilter(filter);
    if (data.length === 0) throw ErrorResponses.noDataFound("Staffs' data");
    return data;
  }

  // Fetch staffs by department
  async staffsByDept(department: Department) {
    const staffs = await this.findAll<IStaff>({ role: department });
    if (staffs.length === 0) throw ErrorResponses.noDataFound(`${department} staff`);
    return staffs;
  }

  // Get single staff data
  async singleStaff(email: string): Promise<IStaff> {
    const staffData = await this.single(email);
    if (!staffData) throw ErrorResponses.noDataFound("staff");
    return staffData;
  }

  // Update staff details
  async updateStaff(email: string, data: any): Promise<IStaff | void> {
    return await this.update(email, data);
  }
}
