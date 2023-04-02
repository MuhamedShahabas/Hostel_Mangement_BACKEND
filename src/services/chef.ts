import { IMealPlan } from "../interfaces/staff";
import { ChefRepo } from "../repositories/chef";

// Chef Service

export class ChefService extends ChefRepo {
  // Adding meal plan
  async newMealPlan(data: IMealPlan): Promise<void> {
    return await this.createPlan(data);
  }

  // Single meal plan
  async singleMealPlan(_id: string): Promise<IMealPlan> {
    return await this.findMealPlan(_id);
  }

  // Updating meal plan
  async updateMealPlan(_id: string, data: IMealPlan): Promise<IMealPlan> {
    return await this.update(_id, data);
  }

  // Change visibitly of meal plan
  async changeAvailability(_id: string): Promise<string> {
    const mealPlan = await this.findMealPlan(_id);
    mealPlan.active = !mealPlan.active;
    await this.update(_id, mealPlan);
    return `${mealPlan.title} plan made ${
      mealPlan.active ? "active" : "in-active"
    }`;
  }
}
