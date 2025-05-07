import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import FormButton from "@/components/AuthForm/FormButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import { loginAPI } from "@/apis/authAPI";
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login, isInitialized } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: { email: string; password: string }) => {
    if (!mounted || !isInitialized) return;

    try {
      setIsLoading(true);

      const response = await loginAPI(data);

      login(response.accessToken);
      const currentAuthState = useAuthStore.getState();
      router.push("/");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          id="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          type="text"
          register={register("email", {
            required: "이메일은 필수입니다.",
            pattern: {
              value: EMAIL_REGEX,
              message: "이메일 형식이 아닙니다.",
            },
          })}
          error={errors.email}
        />
        <FormInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          register={register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요",
            },
          })}
          error={errors.password}
        />
        <FormButton type="submit" loading={isLoading}>
          로그인
        </FormButton>
        <div className="flex justify-center">
          <Link
            href="/signup"
            className="text-md font-normal text-primaryGreen200"
          >
            회원가입
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
