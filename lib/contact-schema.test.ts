import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const valid = {
  name: "Dhanes",
  email: "dhanes@example.com",
  message: "Halo, mau ngobrol soal project.",
};

describe("contactSchema", () => {
  it("menerima input yang valid", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("men-trim spasi di awal/akhir", () => {
    const result = contactSchema.parse({
      ...valid,
      name: "  Dhanes  ",
      email: "  dhanes@example.com ",
    });
    expect(result.name).toBe("Dhanes");
    expect(result.email).toBe("dhanes@example.com");
  });

  it("menolak email yang tidak valid", () => {
    const result = contactSchema.safeParse({ ...valid, email: "bukan-email" });
    expect(result.success).toBe(false);
  });

  it("menolak pesan yang terlalu pendek atau terlalu panjang", () => {
    expect(contactSchema.safeParse({ ...valid, message: "hai" }).success).toBe(
      false,
    );
    expect(
      contactSchema.safeParse({ ...valid, message: "a".repeat(2001) }).success,
    ).toBe(false);
  });

  it("menolak nama yang isinya cuma spasi", () => {
    expect(contactSchema.safeParse({ ...valid, name: "    " }).success).toBe(
      false,
    );
  });
});
