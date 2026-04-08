import { z } from "zod";

const optionalTrimmedString = z.string().trim().optional().or(z.literal("")).transform((value) => {
    if (value === "") return undefined;
    return value;
});

export const updateUserValidation = z.object({
    username: z.string().trim().min(6, { message: "Username must be atleast 6 charecters" }),
    bio: z.string().trim().refine((value) => value.length === 0 || value.length >= 10, {
        message: "Bio must be atleast 10 charecter long"
    }).transform((value) => value || undefined).optional(),
    country: z.string().trim().min(3, { message: "Country name must be atleast 3 charecter long" }),
    university: z.string().trim().min(3, { message: "University name must be atleast 3 charecter long" }),
    github: optionalTrimmedString,
    linkdin: optionalTrimmedString,
    skills: z.array(
        z.string().trim().min(3, { message: "Skills must be 3 charecters long" })
    ).transform((skills) => skills.filter(Boolean))
}).strict()
