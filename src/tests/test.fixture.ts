import { AjvSchema } from '../schemaBuilder/types/AjvSchema';

const ExampleEntity: AjvSchema = {
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  type: 'object',
  required: ['name', 'description'],
  $id: '#/definitions/ExampleEntity',
};
const GlobalRequestDto: AjvSchema = {
  properties: {
    id: {
      type: 'string',
    },
    reqId: {
      type: 'string',
    },
    trace: {
      type: 'string',
    },
    format: {
      enum: ['2.0'],
      type: 'string',
    },
  },
  type: 'object',
  required: ['reqId', 'format'],
  $id: '#/definitions/GlobalRequestDto',
};
const ExampleRequestDto: AjvSchema = {
  properties: {
    method: {
      enum: ['exampleMethod'],
      type: 'string',
    },
    payload: {
      $ref: 'ExampleEntity',
    },
    service: {
      enum: ['exampleService'],
      type: 'string',
    },
    id: {
      type: 'string',
    },
    reqId: {
      type: 'string',
    },
    trace: {
      type: 'string',
    },
    format: {
      enum: ['2.0'],
      type: 'string',
    },
  },
  type: 'object',
  required: ['method', 'payload', 'service', 'reqId', 'format'],
  $id: '#/definitions/ExampleRequestDto',
};
const GlobalResponseError: AjvSchema = {
  properties: {
    code: {
      type: 'number',
    },
    message: {
      type: 'string',
    },
  },
  type: 'object',
  required: ['code', 'message'],
  $id: '#/definitions/GlobalResponseError',
};
const GlobalResponseDto: AjvSchema = {
  properties: {
    error: {
      $ref: 'GlobalResponseError',
    },
    id: {
      type: 'string',
    },
    reqId: {
      type: 'string',
    },
    trace: {
      type: 'string',
    },
    format: {
      enum: ['2.0'],
      type: 'string',
    },
  },
  type: 'object',
  required: ['reqId', 'format'],
  $id: '#/definitions/GlobalResponseDto',
};
const ExampleResponseDto: AjvSchema = {
  properties: {
    format: {
      enum: ['2.0'],
      type: 'string',
    },
    method: {
      enum: ['exampleMethod'],
      type: 'string',
    },
    reqId: {
      type: 'string',
    },
    result: {
      $ref: 'ExampleEntity',
    },
    service: {
      enum: ['exampleService'],
      type: 'string',
    },
    id: {
      type: 'string',
    },
    trace: {
      type: 'string',
    },
    error: {
      $ref: 'GlobalResponseError',
    },
  },
  type: 'object',
  required: ['format', 'method', 'reqId', 'result', 'service'],
  $id: '#/definitions/ExampleResponseDto',
};
