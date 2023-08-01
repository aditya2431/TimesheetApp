import React,{ useState, useEffect } from 'react'
import "./Paginate.css";
import ReactPaginate from 'react-paginate';

const Paginate = ({pageCount,userPerPage,changePage}) => {

  return (
    <ReactPaginate
    previousLabel = {"Previous"}
    nextLabel = {"Next"}
    pageCount={pageCount}
    onPageChange={changePage}
    containerClassName={"paginationBttns"}
    previousLinkClassName='previousBttn'
    nextLinkClassName='nextBttn'
    disabledClassName='paginationDisabled'
    activeClassName='paginationActive'
    />
  )
}

export default Paginate