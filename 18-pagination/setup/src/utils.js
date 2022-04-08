const paginate = (followers) => {
  const itemsPerPage = 9;
  const pages = Math.ceil(followers.length / itemsPerPage);

  // Array.from({ length: 12 }) => [undefined, undefin, .... ].map()
  const newFollowers = Array.from({ length: pages }, ( value, index)=>{
    const start = index * itemsPerPage; // how many influencers we can show on
    /// 100 => page: 3 * itemPerPage  9 => start: 0, 9, 18. 27
    return followers.slice(start, start + itemsPerPage);
  })

  /*

   newFollowers = [
    [firstF, secondF,... ninthFol]
    [tenthF/]
    []
   ]

   newFollowers[page: 0]
  */

  return newFollowers
}

export default paginate
