import React from 'react'
export const Statist =(persons)=>{
console.log(persons)
    return(
    <div>
        { persons && persons.map((person, index) => {
            return(
              <div>
                  <p>{person.name}</p>
                  <p>{person.count}</p>
              </div>

            );
        })}
    </div>
    )
}
