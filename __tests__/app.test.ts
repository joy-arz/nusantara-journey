/**
 * Smoke test: assert core app modules load and expose expected values.
 * Run with: npm test
 */
import { Colors } from "../constants/colors";

describe("App smoke", () => {
  it("exports Colors with required keys", () => {
    expect(Colors).toBeDefined();
    expect(typeof Colors.primary).toBe("string");
    expect(typeof Colors.text).toBe("string");
    expect(typeof Colors.background).toBe("string");
    expect(typeof Colors.overlay).toBe("string");
  });
});
