import React from 'react';
import Link from 'next/link';

type SideItem = {
  id: string;
  title: string;
  icon: string;
  link: string;
};

const Item: React.FC<{ item: SideItem }> = ({ item }) => {
  return (
    <div>
      <Link href={item.link}>
            <div className='my-5 ml-5'>
                <img style={{ cursor: "pointer" }} className='h-16 w-16 rounded-full hover:scale-125' src={item.icon} />
            </div>
      </Link>
    </div>
  );
};

export default Item;