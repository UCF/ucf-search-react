import './SearchBar.scss'

function SearchBar() {
  return (
    <div className='bg-faded py-5'>
      <div className='container'>
        <div className='row align-items-lg-center'>
          <div className='col-lg-4 col-xl-3'>
            <h1 className='h2 text-uppercase mb-3 mb-lg-0'>Search UCF</h1>
          </div>
          <div className='col-lg-8 col-xl-9'>
            <input className='form-control' name='search' id='search' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
