const request = require("supertest");
const app = require("./app");

describe("Campus News API", () => {
  test("should return 404 for a nonexistent route", async () => {
    const response = await request(app).get("/this-route-does-not-exist");

    expect(response.status).toBe(404);
  });
  test("should return 200 for correct route",async()=>{
    const response=await request(app).get("/")

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe("New api works well")
  })

  test("inavalid inputs should return 400 ",async()=>{
    const response= await request(app).post("/api/post").send({})

    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
     expect(Array.isArray(response.body.errors)).toBe(true)
  })
});
