import { Request, Response } from "express";
import { ClientService } from "../services/client.service";
import { ApiHelper } from "../helpers/api.helper";

const clientService = new ClientService();

export class ClientController {
  async createClient(req: Request, res: Response) {
    try {
      const client = await clientService.create(req.body);
      ApiHelper.success(res, client, 201);
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Failed to create client");
    }
  }

  async getClient(req: Request, res: Response) {
    try {
      const client = await clientService.findById(req.params.id);
      if (!client) return ApiHelper.notFound(res, "Client not found");
      const enrollments = await clientService.getEnrollments(req.params.id);
      ApiHelper.success(res, { client, enrollments });
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Failed to retrieve client");
    }
  }

  async searchClients(req: Request, res: Response) {
    try {
      const term = req.query.term as string;
      if (!term) return ApiHelper.error(res, "Search term required", 400);
      const results = await clientService.search(term);
      ApiHelper.success(res, results);
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Search failed");
    }
  }

  async enrollClient(req: Request, res: Response) {
    try {
      const clientId = req.params.id;
      const { programId } = req.body;
      const enrolled = await clientService.enroll(clientId, programId);
      ApiHelper.success(res, enrolled, 201);
    } catch (err: any) {
      console.error(err);
      if (
        err.message === "Client not found" ||
        err.message === "Program not found"
      ) {
        return ApiHelper.error(res, err.message, 404);
      }
      ApiHelper.error(res, "Enrollment failed");
    }
    ApiHelper.error(res, "Enrollment failed");
  }

  async getClientEnrollments(req: Request, res: Response) {
    try {
      const enrollments = await clientService.getEnrollments(req.params.id);
      ApiHelper.success(res, enrollments);
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Failed to fetch enrollments");
    }
  }
}
