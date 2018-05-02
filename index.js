function removeFromArray(number, arr){
  for(let index=0; index<arr.length; index++){
    if(arr[index]==number){
      arr.splice(index, 1)
      return arr
    }
  }
}

function findBlockOptions(numbers, blockRow, blockCol){
  let numberArray = [1,2,3,4,5,6,7,8,9]
  let options = [
    [[], [], []],
    [[], [], []],
    [[], [], []]
  ] 
  for(let r=0 + (3*blockRow); r<3 + (3*blockRow); r++){
    for(let c=0 + (3*blockCol); c<3 + (3*blockCol); c++){
      if(numbers[r][c]>0){
        numberArray = removeFromArray(numbers[r][c], numberArray)
      }
    }
  }
  for(let r=0 + (3*blockRow); r<3 + (3*blockRow); r++){
    let or=r-(3*blockRow)
    for(let c=0 + (3*blockCol); c<3 + (3*blockCol); c++){
      let oc=c - (3*blockCol)
      if(numbers[r][c]==0){
        options[or][oc]=numberArray
      }
    }
  }

  return options
}

function findRowOptions(numbers, options, row){
  let numberArray = [1,2,3,4,5,6,7,8,9]
  for(let c=0; c<9; c++){
    if(numbers[row][c]>0){
      numberArray = removeFromArray(numbers[row][c], numberArray)
    }
  }

  for(let c=0; c<9; c++){
    if(numbers[row][c]==0){
      let newOptions=[]
      //now need to compare the old options to the new options
      //only options in both can be used
      for(let oldOptionIndex=0; oldOptionIndex<options[row][c].length; oldOptionIndex++) {
        for(let newOptionIndex=0; newOptionIndex<numberArray.length; newOptionIndex++) {
          if(options[row][c][oldOptionIndex]==numberArray[newOptionIndex]){
            if(newOptions.indexOf(numberArray[newOptionIndex])==-1){
              newOptions.push(numberArray[newOptionIndex])
            }
          }
        }
      }
      options[row][c]=newOptions
    }
  }

  return options
}

function findColOptions(numbers, options, col){
  let numberArray = [1,2,3,4,5,6,7,8,9]
  for(let r=0; r<9; r++){
    if(numbers[r][col]>0){
      numberArray = removeFromArray(numbers[r][col], numberArray)
    }
  }

  for(let r=0; r<9; r++){
    if(numbers[r][col]==0){
      let newOptions=[]
      //now need to compare the old options to the new options
      //only options in both can be used
      for(let oldOptionIndex=0; oldOptionIndex<options[r][col].length; oldOptionIndex++) {
        for(let newOptionIndex=0; newOptionIndex<numberArray.length; newOptionIndex++) {
          if(options[r][col][oldOptionIndex]==numberArray[newOptionIndex]){
            if(newOptions.indexOf(numberArray[newOptionIndex])==-1){
              newOptions.push(numberArray[newOptionIndex])
            }
          }
        }
      }
      options[r][col]=newOptions
    }
  }

  return options
}

function lookForHiddenPairsInBlock(options, blockRow, blockCol){
  let count=[0,0,0,0,0,0,0,0,0]
  for(let r=0 + (3*blockRow); r<3 + (3*blockRow); r++){
    for(let c=0 + (3*blockCol); c<3 + (3*blockCol); c++){
      for(let index=0; index<options[r][c].length; index++){
        count[options[r][c][index]-1]++
      }
    }
  }

  let pairs=[]
  for(let index=0; index<count.length; index++){
    if(count[index]==2){
      pairs.push(index+1)
    }
  }

  //Now check to see if any are in the same two cells
  let found=false
  for(let index=0; index<pairs.length; index++){
    if(found==false){
      let r1=-1
      let c1=-1
      let r2=-1
      let c2=-1

      for(let r=0 + (3*blockRow); r<3 + (3*blockRow); r++){
        for(let c=0 + (3*blockCol); c<3 + (3*blockCol); c++){
          if(options[r][c].indexOf(pairs[index])>-1){
            if(r1==-1){
              r1=r
              c1=c
            } else {
              r2=r
              c2=c
            }
          }
        }
      }

      //now check for any others
      for(let c_i=0; c_i<pairs.length; c_i++){
        if(c_i != index && found==false){
          let c_r1=-1
          let c_c1=-1
          let c_r2=-1
          let c_c2=-1
          for(let c_r=0 + (3*blockRow); c_r<3 + (3*blockRow); c_r++){
            for(let c_c=0 + (3*blockCol); c_c<3 + (3*blockCol); c_c++){
              if(options[c_r][c_c].indexOf(pairs[c_i])>-1){
                if(c_r1==-1){
                  c_r1=c_r
                  c_c1=c_c
                } else {
                  c_r2=c_r
                  c_c2=c_c
                }
              }
            }
          }
          if((r1==c_r1 && c1==c_c1 && r2==c_r2 && c2==c_c2) || (r1==c_r2 && c1==c_c2 && r2==c_r1 && c2==c_c1)){
            options[r1][c1]=[pairs[index], pairs[c_i]]
            options[r2][c2]=[pairs[index], pairs[c_i]]
            found=true
          }
        }
      }
    }
  }

  return options
}

function lookForHiddenPairsInRow(options, row){
  let count=[0,0,0,0,0,0,0,0,0]
  for(let c=0; c<9; c++){
    for(let index=0; index<options[row][c].length; index++){
      count[options[row][c][index]-1]++
    }
  }

  let pairs=[]
  for(let index=0; index<count.length; index++){
    if(count[index]==2){
      pairs.push(index+1)
    }
  }

  //Now check to see if any are in the same two cells
  let found=false
  for(let index=0; index<pairs.length; index++){
    if(found==false){
      let r1=-1
      let c1=-1
      let r2=-1
      let c2=-1

      for(let c=0; c<9; c++){
        if(options[row][c].indexOf(pairs[index])>-1){
          if(r1==-1){
            r1=row
            c1=c
          } else {
            r2=row
            c2=c
          }
        }
      }

      //now check for any others
      for(let c_i=0; c_i<pairs.length; c_i++){
        if(c_i != index && found==false){
          let c_r1=-1
          let c_c1=-1
          let c_r2=-1
          let c_c2=-1
          for(let c_c=0; c_c<9; c_c++){
            if(options[row][c_c].indexOf(pairs[c_i])>-1){
              if(c_r1==-1){
                c_r1=row
                c_c1=c_c
              } else {
                c_r2=row
                c_c2=c_c
              }
            }
          }
          if((r1==c_r1 && c1==c_c1 && r2==c_r2 && c2==c_c2) || (r1==c_r2 && c1==c_c2 && r2==c_r1 && c2==c_c1)){
            options[r1][c1]=[pairs[index], pairs[c_i]]
            options[r2][c2]=[pairs[index], pairs[c_i]]
            found=true
          }
        }
      }
    }
  }

  return options
}

function lookForHiddenPairsInCol(options, col){
  let count=[0,0,0,0,0,0,0,0,0]
  for(let r=0; r<9; r++){
    for(let index=0; index<options[r][col].length; index++){
      count[options[r][col][index]-1]++
    }
  }

  let pairs=[]
  for(let index=0; index<count.length; index++){
    if(count[index]==2){
      pairs.push(index+1)
    }
  }

  //Now check to see if any are in the same two cells
  let found=false
  for(let index=0; index<pairs.length; index++){
    if(found==false){
      let r1=-1
      let c1=-1
      let r2=-1
      let c2=-1

      for(let r=0; r<9; r++){
        if(options[r][col].indexOf(pairs[index])>-1){
          if(r1==-1){
            r1=r
            c1=col
          } else {
            r2=r
            c2=col
          }
        }
      }

      //now check for any others
      for(let c_i=0; c_i<pairs.length; c_i++){
        if(c_i != index && found==false){
          let c_r1=-1
          let c_c1=-1
          let c_r2=-1
          let c_c2=-1
          for(let c_r=0; c_r<9; c_r++){
            if(options[c_r][col].indexOf(pairs[c_i])>-1){
              if(c_r1==-1){
                c_r1=c_r
                c_c1=col
              } else {
                c_r2=c_r
                c_c2=col
              }
            }
          }
          if((r1==c_r1 && c1==c_c1 && r2==c_r2 && c2==c_c2) || (r1==c_r2 && c1==c_c2 && r2==c_r1 && c2==c_c1)){
            options[r1][c1]=[pairs[index], pairs[c_i]]
            options[r2][c2]=[pairs[index], pairs[c_i]]
            found=true
          }
        }
      }
    }
  }

  return options
}

function lookForNumbersInOneBlock(options, blockRow, blockCol){
  let count=[0,0,0,0,0,0,0,0,0]
  for(let r=0 + (3*blockRow); r<3 + (3*blockRow); r++){
    for(let c=0 + (3*blockCol); c<3 + (3*blockCol); c++){
      for(let index=0; index<options[r][c].length; index++){
        count[options[r][c][index]-1]++
      }
    }
  }

  for(let index=0; index<count.length; index++){
    if(count[index]==1){
      //look for that number and remove all other options
      for(let r=0 + (3*blockRow); r<3 + (3*blockRow); r++){
        for(let c=0 + (3*blockCol); c<3 + (3*blockCol); c++){
          if(options[r][c].indexOf(index+1)>-1){
            options[r][c]=[index+1]
          }
        }
      }
    }
  }

  return options
}

function lookForNumbersInOneRow(options, row){
  let count=[0,0,0,0,0,0,0,0,0]
  for(let c=0; c<9; c++){
    for(let index=0; index<options[row][c].length; index++){
      count[options[row][c][index]-1]++
    }
  }

  for(let index=0; index<count.length; index++){
    if(count[index]==1){
      //look for that number and remove all other options
      for(let c=0; c<9; c++){
        if(options[row][c].indexOf(index+1)>-1){
          options[row][c]=[index+1]
        }
      }
    }
  }

  return options
}

function lookForNumbersInOneCol(options, col){
  let count=[0,0,0,0,0,0,0,0,0]
  for(let r=0; r<9; r++){
    for(let index=0; index<options[r][col].length; index++){
      count[options[r][col][index]-1]++
    }
  }

  for(let index=0; index<count.length; index++){
    if(count[index]==1){
      //look for that number and remove all other options
      for(let r=0; r<9; r++){
        if(options[r][col].indexOf(index+1)>-1){
          options[r][col]=[index+1]
        }
      }
    }
  }

  return options
}

function lookForBlockOptimizations(options){
  for(let r=0; r<3; r++){
    for(let c=0; c<3; c++){
      options = lookForNumbersInOneBlock(options, r, c)
    }
  }

  for(let r=0; r<3; r++){
    for(let c=0; c<3; c++){
      options = lookForHiddenPairsInBlock(options, r, c)
    }
  }
  return options
}

function lookForRowOptimizations(options){
  for(let r=0; r<9; r++){
    options = lookForNumbersInOneRow(options, r)
  }
  for(let r=0; r<9; r++){
    options = lookForHiddenPairsInRow(options, r)
  }
  return options
}

function lookForColOptimizations(options){
  for(let c=0; c<9; c++){
    options = lookForNumbersInOneCol(options, c)
  }
  return options
}

function convertOptionsToNumbers(numbers, options){
  //Check for single numbers
  for(let r=0; r<9; r++){
    for(let c=0; c<9; c++){
      if(numbers[r][c]==0){
        if(options[r][c].length==1){
          numbers[r][c] = options[r][c][0]
        }
      }
    }
  }

  return numbers

}

function addNewBlockOptions(numbers, options, blockRow, blockCol){
  let newOptions = findBlockOptions(numbers, blockRow, blockCol)
  for(let r=0; r<3; r++){
    for(let c=0; c<3; c++){
      options[r+blockRow*3][c+blockCol*3]=newOptions[r][c]
    }
  }
  return options
}

function doRound(numbers){
  let options = [[],[],[],[],[],[],[],[],[]]

  for(let r=0; r<3; r++){
    for(let c=0; c<3; c++){
      options = addNewBlockOptions(numbers, options, r, c)
    }
  }

  for(let r=0; r<9; r++){
    options= findRowOptions(numbers, options, r)
  }

  for(let c=0; c<9; c++){
    options= findColOptions(numbers, options, c)
  }

  options = lookForBlockOptimizations(options)
  options = lookForRowOptimizations(options)
  options = lookForColOptimizations(options)
  numbers = convertOptionsToNumbers(numbers, options)
  return numbers
}

function resolve(){
  let numbers = [[],[],[],[],[],[]]
  //EASY
  numbers[0] = [
    [0,2,0,0,0,3,0,0,6],
    [6,0,4,0,0,1,3,0,0],
    [0,0,0,7,0,6,1,0,4],
    [0,8,9,0,3,0,2,0,0],
    [2,0,0,5,7,8,0,0,9],
    [0,0,7,0,1,0,6,3,0],
    [4,0,2,3,0,5,0,0,0],
    [0,0,6,1,0,0,8,0,5],
    [8,0,0,9,0,0,0,4,0]
  ]
  numbers[1] = [
    [8,0,7,0,0,3,0,5,0],
    [0,0,5,0,2,1,8,4,9],
    [0,2,0,5,0,0,6,3,0],
    [9,8,0,0,7,0,0,0,0],
    [0,0,0,2,0,6,0,0,0],
    [0,0,0,0,5,0,0,8,6],
    [0,4,2,0,0,5,0,9,0],
    [5,3,9,6,4,0,1,0,0],
    [0,1,0,9,0,0,4,0,5]
  ]
  //MEDIUM
  numbers[2] = [
    [0,0,0,0,4,0,0,0,0],
    [9,0,0,0,0,8,0,4,0],
    [4,0,0,2,7,0,8,0,0],
    [8,4,9,0,0,0,0,2,6],
    [0,0,2,0,0,0,5,0,0],
    [6,1,0,0,0,0,9,7,8],
    [0,0,8,0,6,9,0,0,7],
    [0,6,0,3,0,0,0,0,9],
    [0,0,0,0,1,0,0,0,0]
  ]
  numbers[3] = [
    [2,0,0,7,6,0,0,0,0],
    [0,0,0,1,0,0,3,0,0],
    [1,6,5,0,4,2,0,0,0],
    [0,0,6,4,0,0,5,0,9],
    [0,0,0,6,0,1,0,0,0],
    [9,0,4,0,0,8,7,0,0],
    [0,0,0,9,1,0,4,2,7],
    [0,0,1,0,0,4,0,0,0],
    [0,0,0,0,7,6,0,0,1]
  ]
  
  //HARD
  numbers[4] = [
    [0,0,8,4,3,0,0,0,0],
    [7,0,1,0,2,6,0,0,0],
    [0,9,3,0,0,7,0,0,0],
    [0,0,0,3,0,0,8,7,0],
    [0,0,0,0,9,0,0,0,0],
    [0,2,7,0,0,4,0,0,0],
    [0,0,0,8,0,0,9,6,0],
    [0,0,0,6,1,0,3,0,7],
    [0,0,0,0,7,3,5,0,0]
  ]

  //EVIL
  numbers[5] = [
    [0,0,0,6,0,0,0,0,9],
    [7,0,0,0,0,1,0,0,0],
    [8,0,0,0,4,7,0,2,0],
    [0,0,2,0,9,0,0,8,1],
    [0,0,1,0,0,0,6,0,0],
    [3,6,0,0,5,0,4,0,0],
    [0,3,0,8,6,0,0,0,5],
    [0,0,0,5,0,0,0,0,8],
    [4,0,0,0,0,3,0,0,0]
  ]

  for(let index=0;index<numbers.length;index++){
    console.log()
    console.log('problem no: ', index+1)
    let anotherRound=true
    let count=0
    while(anotherRound==true && count<20){
      numbers[index] = doRound(numbers[index])
      anotherRound=false
      count++
      let noUnsolvedCells=0
      for(let r=0; r<9; r++){
        for(let c=0; c<9; c++){
          if(numbers[index][r][c]==0){
            anotherRound=true
            noUnsolvedCells++
          }
        }
      }
      console.log('round', count)
      console.log(noUnsolvedCells + ' cells still to solve')
    }
    if(count<20){
      console.log('solved in ' + count + ' rounds')
    } else {
      console.log('not solved in ' + count + ' rounds')
    }
  }
  
}

resolve()

