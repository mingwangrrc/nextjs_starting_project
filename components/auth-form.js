'use client';
import { useState } from 'react';
import { Form, Input, Button } from 'antd';

export default function AuthForm({
  onSubmit,
  submitText,
  includeName,
  includeUsername,
  includeEmail = true,
}) {
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      alert(JSON.stringify(values, null, 2));
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      style={{ maxWidth: 400, margin: '0 auto' }}
      layout="vertical"
    >
      {includeName && (
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
      )}
      {includeUsername && (
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
      )}
      {includeEmail && (
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
      )}
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
