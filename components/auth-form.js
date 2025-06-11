'use client';
import { useState } from 'react';
import { Form, Input, Button } from 'antd';

export default function AuthForm({ onSubmit, submitText, includeName }) {
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
          <Input />
        </Form.Item>
      )}
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email' }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}
