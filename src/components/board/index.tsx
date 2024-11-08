"use client";

import PromptBar from './components/prompt-bar';
import CodeEditorSection from './components/codeeditor/code-editor-section';
import useFlowStore from '@/stores/flow';
import NodeRenderer from './components/react-flow-renderer';

type Props = {}

export default function SchemaBoard({}: Props) {
  const { codeEditorOpen } = useFlowStore();
  
  const mockNodes = [
    {
      "id": "coffee_types",
      "position": {
        "x": 0,
        "y": 0
      },
      "type": "databaseSchema",
      "data": {
        "label": "Coffee Types",
        "schema": [
          {
            "title": "coffee_type_id",
            "type": "serial"
          },
          {
            "title": "name",
            "type": "varchar"
          },
          {
            "title": "description",
            "type": "text"
          },
          {
            "title": "price",
            "type": "numeric"
          }
        ]
      }
    },
    {
      "id": "employees",
      "position": {
        "x": 300,
        "y": 0
      },
      "type": "databaseSchema",
      "data": {
        "label": "Employees",
        "schema": [
          {
            "title": "employee_id",
            "type": "serial"
          },
          {
            "title": "first_name",
            "type": "varchar"
          },
          {
            "title": "last_name",
            "type": "varchar"
          },
          {
            "title": "email",
            "type": "varchar"
          },
          {
            "title": "hire_date",
            "type": "date"
          }
        ]
      }
    },
    {
      "id": "orders",
      "position": {
        "x": 600,
        "y": 0
      },
      "type": "databaseSchema",
      "data": {
        "label": "Orders",
        "schema": [
          {
            "title": "order_id",
            "type": "serial"
          },
          {
            "title": "employee_id",
            "type": "int"
          },
          {
            "title": "order_date",
            "type": "timestamp"
          }
        ]
      }
    },
    {
      "id": "order_items",
      "position": {
        "x": 300,
        "y": 200
      },
      "type": "databaseSchema",
      "data": {
        "label": "Order Items",
        "schema": [
          {
            "title": "order_item_id",
            "type": "serial"
          },
          {
            "title": "order_id",
            "type": "int"
          },
          {
            "title": "coffee_type_id",
            "type": "int"
          },
          {
            "title": "quantity",
            "type": "int"
          }
        ]
      }
    }
  ];

  const iedges = [
    {
      "id": "orders-employees",
      "target": "orders",
      "source": "employees",
      "sourceHandle": "employee_id",
      "targetHandle": "employee_id",
      "type": "smoothstep",
      "animation": true
    },
    {
      "id": "order_items-orders",
      "target": "order_items",
      "source": "orders",
      "sourceHandle": "order_id",
      "targetHandle": "order_id",
      "type": "smoothstep",
      "animation": true
    },
    {
      "id": "order_items-coffee_types",
      "target": "order_items",
      "source": "coffee_types",
      "sourceHandle": "coffee_type_id",
      "targetHandle": "coffee_type_id",
      "type": "smoothstep",
      "animation": true
    }
  ];

  
  
  return (
    <div className='flex-1 relative flex'>
      <div className='flex-[3] relative'>
        <NodeRenderer 
          nodes={mockNodes}
          edges={iedges}
        />        
        <PromptBar />
      </div>

      <CodeEditorSection />
    </div>
  );
}