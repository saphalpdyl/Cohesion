import SchemaBoard from '@/components/flow/board';
import React from 'react'

export default function ProjectPage({
  params,
}: {
  params: {
    projectid: string,
  }
}) {
  
  return (
    <div className='flex-1 flex flex-col'>
      <SchemaBoard />
    </div>
  );
}