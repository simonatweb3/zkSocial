import { Divider, Steps } from 'antd';
import React from 'react';
const CreationSteps: React.FC<{step:number, setStep: (value: number) => void}> = ({step, setStep}) => (
  <>
    <Steps
      className='flex justify-center  font-mono'
      current={step}
      onChange={(c) => {setStep(c)}}
      labelPlacement="vertical"
      items={[
        {
          title: 'Details',
          icon: <img src={'/icons/step1.png'} width={30} />,
          style: {
            flexDirection: 'column', // stack the icon and title vertically
            alignItems: 'center' // center the icon and title within the step item
          }
        },
        {
          title: 'Visibility',
          icon: <img src={'/icons/step2.png'} width={30} />,
        },
        {
          title: 'Token Setup',
          icon: <img src={'/icons/step3.png'} width={30} />,
        }
      ]}
    />
   
  </>
);

export default CreationSteps;