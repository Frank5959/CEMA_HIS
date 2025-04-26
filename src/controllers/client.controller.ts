import { Request, Response } from "express";
import { ClientService } from "../services/client.service";
import { ApiHelper } from "../helpers/api.helper";
import { ApiResponse, Client, Program } from "../types/core";

export class ClientController {
  private clientService = new ClientService();

  async createClient(req: Request, res: Response) {
    try {
      const newClient = await this.clientService.create(req.body);
      ApiHelper.success(res, newClient, 201);
    } catch (error) {
      ApiHelper.error(res, "Failed to create client");
    }
  }

  async getClient(req: Request, res: Response) {
    try {
      const client = await this.clientService.findById(req.params.id);
      if (!client) return ApiHelper.notFound(res);

      const enrollments = await this.clientService.getEnrollments(
        req.params.id
      );
      const response: ApiResponse<{ client: Client; enrollments: Program[] }> =
        {
          success: true,
          data: { client, enrollments },
        };

      res.json(response);
    } catch (error) {
      ApiHelper.error(res, "Failed to retrieve client");
    }
  }

  async searchClients(req: Request, res: Response) {
    try {
      const results = await this.clientService.search(req.query.term as string);
      ApiHelper.success(res, results);
    } catch (error) {
      ApiHelper.error(res, "Search failed");
    }
  }
}
