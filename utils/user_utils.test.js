const { _vEmail } = require("./user_utils");

test("Email validation", () => {
    expect(_vEmail("abcd")).toBe(false);
    expect(_vEmail("abcd.sds@")).toBe(false);
    expect(_vEmail("aaa@aa.c")).toBe(false);
    expect(_vEmail("asdv@asd.case")).toBe(true);
    expect(_vEmail("asdv@asdcase")).toBe(false);
});

