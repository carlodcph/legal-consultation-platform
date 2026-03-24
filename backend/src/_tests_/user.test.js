const request = require("supertest");
const app = require("../app");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

beforeAll(async () => {
  // optional: clean DB before test
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User API", () => {
    let userId;
  
    it("create user", async () => {
      const res = await request(app).post("/users").send({
        name: "Mack",
        email: "mack@test.com",
        role: "CLIENT",
      });
  
      expect(res.statusCode).toBe(201);
      userId = res.body.id;
    });
  
    it("get users", async () => {
      const res = await request(app).get("/users");
  
      expect(res.body.length).toBe(1);
    });
  
    it("soft delete user", async () => {
      const res = await request(app).delete(`/users/${userId}`);
  
      expect(res.body.deletedAt).not.toBeNull();
    });
  
    it("exclude deleted users", async () => {
      const res = await request(app).get("/users");
  
      expect(res.body.length).toBe(0);
    });
  });