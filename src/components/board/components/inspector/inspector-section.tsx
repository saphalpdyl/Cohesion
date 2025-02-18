"use client";

import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';

import CodeEditorTab from './inspector-tab';
import CodeEditor from './code-editor';
import DocumentationViewer from './documentation-viewer';

import useFlowStore from '@/stores/flow';
import useInspectorStore, { TABS__DOCUMENTATION, TABS__EXPORT, TABS__MAIN_SCHEMA, TABS__MOCK_DATA } from '@/stores/inspector';
import MockDataGenerationSection from './mock-data-generation';
import ExportSchemaToORMSection from './export-section';

type Props = {};

const TABS__DESCRIPTION: {[_:string]:string} = {
  "main-code": "View AI-generated schema of your prompts",
  "documentation": "AI-generated documentaions of the schema code",
  "mock-data": "Generate unique mock data from schema",
  "export": "Export generated schemas to your favorite ORMs"
}

export default function CodeEditorSection({}: Props) {
  const { toggleEditorOpen, codeEditorOpen } = useFlowStore();
  const { mainCodeDiffMode, buffering, mainSchemaText, currentTab, setCurrentTab } = useInspectorStore();
  
  const handleTabChange = (value: string) => setCurrentTab(value);
  
  useEffect(() => {
    
  }, []);
  
  return (
    <>
    {/* This component will open the editor if the mouse pulled towards the right
        right of the screen
     */}
      <div 
        onMouseEnter={toggleEditorOpen}
        className='absolute h-[100%] w-4 right-0 top-1/2 -translate-y-1/2' />
    
      <motion.div 
        className='relative' // Added relative
        animate={{
          width: codeEditorOpen ? mainCodeDiffMode && !buffering ? "65%" : "40%" : "0%"
          }}
          initial={{
            width: "0%"
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
              }}
              >
        <div className={`p-4 flex flex-col`}>
          <div className='flex justify-between items-center px-2 mb-4'>
            <div className='flex flex-col'>
              <span className='font-bold text-emerald-500 font-sans text-xl'>Schema Inspector</span>
              <p className='text-xs text-gray-400 font-sans'>{TABS__DESCRIPTION[currentTab]}</p>
            </div>            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <X onClick={toggleEditorOpen} size={18} className='text-emerald-500'/>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Close</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <TabsList className='bg-transparent gap-2 border-b-[1px] border-gray-500/40 pb-3 mb-3 rounded-none w-full justify-start'>
              <CodeEditorTab value={TABS__MAIN_SCHEMA} loading={buffering}>Schema</CodeEditorTab>
              {
                mainSchemaText.length > 0 && <CodeEditorTab value={TABS__DOCUMENTATION}>Documentation</CodeEditorTab>
              }
              {
                mainSchemaText.length > 0 && <CodeEditorTab value={TABS__MOCK_DATA}>Mock Data</CodeEditorTab>
              }
              {
                mainSchemaText.length > 0 && <CodeEditorTab value={TABS__EXPORT}>Export</CodeEditorTab>
              }
            </TabsList>
            <TabsContent value={TABS__MAIN_SCHEMA}>
              <CodeEditor />          
            </TabsContent>

            <TabsContent value={TABS__DOCUMENTATION}>
              <DocumentationViewer />
            </TabsContent>

            <TabsContent value={TABS__MOCK_DATA}>
              <MockDataGenerationSection />
            </TabsContent>

            <TabsContent value={TABS__EXPORT}>
              <ExportSchemaToORMSection />
            </TabsContent>

          </Tabs>
        </div>
      </motion.div>
    </>
  );
}