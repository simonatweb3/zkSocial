import React from 'react';
import Link from 'next/link';
type GroupItem = {
  groupId: string;
  icon: string;
};

const GroupItem: React.FC<{ item: GroupItem }> = ({ item }) => {

  return (
    <div className='my-2 ml-5 '>
        {item.icon? <img style={{ cursor: "pointer" }} className='h-16 w-16 rounded-full  hover:scale-125' src={item.icon} />
        : <img style={{ cursor: "pointer" }} className='h-16 w-16 rounded-full  hover:scale-125' src='/icons/logo.png' />}
    </div>
  );
};

export default GroupItem;