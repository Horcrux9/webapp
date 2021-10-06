const { TestWatcher } = require("@jest/core")
const { _fromB64, _toB64, _validateP } = require("./auth")

test("From Base64 to UTF-8", () => {
    expect(_fromB64("Y2xvdWQ=")).toBe("cloud");
});

test("From UTF-8 to Base64", () => {
    expect(_toB64("cloud")).toBe("Y2xvdWQ=");
});

test("Validate password", async () => {
    expect(await _validateP("skdjfhskdfjhg", "$2b$10$14fSXD.nrFh8Y5bPBi0VkudC95o/mBy6nHI1esUWc9BUS19eDR4Cu")).toBe(true);
});
