import React from 'react'

// components

import ListUsers from "./users/ListUsers";


export default function Tables() {

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ListUsers color="dark" />
        </div>
      </div>
    </>
  );
}
