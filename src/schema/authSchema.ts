import z from "zod";

export const signInSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export const signUpSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  nickname: z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  profileImage: z
    .any()
    .refine((files) => files?.length === 1, "프로필 사진을 업로드해주세요."),
});
