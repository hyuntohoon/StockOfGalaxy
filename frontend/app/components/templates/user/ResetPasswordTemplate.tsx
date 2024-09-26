"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Title from "../../atoms/common/Title";
import ResetPasswordInputGroup from "../../molecules/user/ResetPasswordInputGroup";
import LoginButton from "../../atoms/user/LoginButton";
import { resetPassword } from "@/app/utils/apis/users/password";
import { FormContainer } from "@/app/styles/user";


const FindPasswordTemplate = () => {
  const router = useRouter();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <>
      <FormContainer>
      <Title text="reset password" size={45} color="white" weight={700} />

        <ResetPasswordInputGroup
          setPassword1={setPassword1}
          setPassword2={setPassword2}
        />
        <LoginButton
          value="비밀번호 변경"
          onClickProps={async () => {
            const res = await resetPassword(password1, password2);

            if (res === true) {
              alert("비밀번호가 변경되었습니다.");
              router.push("/login");
            }
          }}
        />
      </FormContainer>
    </>
  );
};

export default FindPasswordTemplate;
