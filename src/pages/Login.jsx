import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLanguage from '@/locale/useLanguage';
import { Form, Button, Alert } from 'antd';
import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';

const LoginPage = () => {
  const translate = useLanguage();
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [attempts, setAttempts] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    let timer;
    if (isTimerActive) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimerActive(false);
            setRemainingTime(30);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive]);

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  const onFinish = (values) => {
    if (isTimerActive) return; // Prevent login attempts while timer is active

    dispatch(login({ loginData: values }));

    // Simulate a login failure condition (replace with actual failure handling)
    const isValidLogin = values.email === 'test@example.com' && values.password === 'password';

    if (!isValidLogin) {
      setAttempts((prev) => {
        if (prev >= 2) {
          setIsTimerActive(true);
          return 0;
        }
        return prev + 1;
      });
    }
  };

  const FormContainer = () => (
    <Loading isLoading={isLoading}>
      {isTimerActive && (
        <Alert message={`Too many attempts. Please wait for ${remainingTime} seconds.`} type="error" showIcon />
      )}
      <Form
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <LoginForm />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading || isTimerActive}
            size="large"
            disabled={isTimerActive}
          >
            {translate('Log in')}
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );

  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign in" />;
};

export default LoginPage;
