import { strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";
import { Vector3 } from "../src";

describe("Vector3", () => {
  describe("length", () => {
    it("should return length of a vector", () => {
      const vec = new Vector3(1, 2, 3);
      const length = vec.length();
      strictEqual(
        length,
        Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z)
      );
    });
  });
});
