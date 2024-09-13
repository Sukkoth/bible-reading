function NotFound() {
  return (
    <div className='text-xl h-full text-center py-5'>
      <p>{location.pathname}</p>
      <h1>Page Not found</h1>
    </div>
  );
}

export default NotFound;
