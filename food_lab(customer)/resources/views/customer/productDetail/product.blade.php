@extends('COMMON.layout.layout_customer')

@section('title')
  {{ $name->site_name }} | Food
@endsection

@section('css')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ url('css/customerProduct.css') }}" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="{{ url('css/commonCustomer.css') }}" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
@endsection

@section('script')
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

@endsection

@section('title', 'Food Lab')

@section('header')

    {{-- proudct section --}}
    <section>
        <div class="container-fluid">
            <div class="d-flex">
                <p class="products">Food</p>
            </div>
        </div>

        <div class="container-fluid p-3">
        <div class="row">
            <div class="col-sm-3">
                <div class="form-group">
                    <select class="selectpicker p-3 mx-3 m-5 mt-0 "  data-size="5" name="type" id="selectpicker1">
                        <option class="selectpicker1" value="" selected disabled>Lists By Category</option>
                        @foreach ($mFav as $item)
                            <option  value="{{ $item->id }}" class="special">{{ $item->favourite_food }}</option>
                        @endforeach

                    </select>
                </div>
            </div>

            <div class="col-sm-3 ms-auto my-auto btnappend">
               <a href="" id="typetag"> <button type="button" class="btn typebtns">See All</button></a>
            </div>
        </div>

       <div id="byCategory" class="col-md-12 col-sm-12 d-flex flex-wrap m-auto border border-3 text-light productbox">
            @foreach( $products as $item)

            <div class="col-md-3 col-sm-3 d-flex flex-column justify-content-center align-items-center m-auto my-3 fw-bold py-5">

                <div class="image-container">
                    <img src=" @isset($item->path)/storage/{{ $item->path }}@endisset" class="images" alt="bestitem1" />
                </div>

                <p class="fs-3 pt-2">{{ $item->product_name }}</p>
                <p class="fs-5 m-auto p-2"><i class="fas fa-coins me-2 coins"></i>{{ $item->coin }}   <br> <i class="fa-solid fa-money-bill money text-success"></i>  {{ number_format($item->amount) }} MMK</p>
                <a href="productDetail?id={{ $item->link_id }}"><button type="button" class="btn detailbtns"> More Details</button></a>
                @if (session()->has('customerId'))
                <button type="button" id="{{ $item->link_id }}" class="btn shopbtns shopcart" data-bs-toggle="modal" data-bs-target="#modal">{{ __('messageAMK.shopnow') }}</button>
                @else
                <a href="/signin"><button type="button" class="btn shopbtns">{{ __('messageAMK.shopnow') }}</button></a>
                @endif
            </div>
            @endforeach
        </div>


        <div class="row">
            <div class="col-sm-3">
                <div class="form-group">
                    <select class="selectpicker p-3 mx-3 m-5" data-size="7" id="selectpicker2">
                        <option class="" value="" selected disabled>Lists By Taste</option>
                        @foreach ($mTaste as $item)
                        <option  value="{{ $item->id }}" class="special">{{ $item->taste }}</option>
                    @endforeach
                    </select>
                </div>
            </div>

            <div class="col-sm-3 ms-auto my-auto btnappend">
                <a href="" id="tastetag"> <button type="button" class="btn tastebtns">See All</button></a>
             </div>
        </div>

        <div id="byTaste" class="col-md-12 col-sm-12 d-flex flex-wrap m-auto border border-3 text-light productbox">

            @foreach( $products as $item)

            <div class="col-md-3 col-sm-3 d-flex flex-column justify-content-center align-items-center m-auto my-3 fw-bold py-5">
                <div class="image-container">
                    <img src="/storage/{{ $item->path }}" class="images" alt="bestitem1" />
                </div>
                <p class="fs-3 pt-2">{{ $item->product_name }}</p>
                <p class="fs-5"><i class="fas fa-coins me-2 coins"></i>{{ $item->coin }}   <br> <i class="fa-solid fa-money-bill money text-success"></i>     {{ number_format($item->amount) }} MMK</p>
                <a href="productDetail?id={{ $item->link_id }}"><button type="button" class="btn detailbtns"> More Details</button></a>
                @if (session()->has('customerId'))
                <a href=""><button type="button" id="{{ $item->link_id }}" class="btn shopbtns shopcart" data-bs-toggle="modal" data-bs-target="#modal">{{ __('messageMK.shopnow') }}</button></a>
                @else
                <a href="/signin"><button type="button" class="btn shopbtns">{{ __('messageMK.shopnow') }}</button></a>
                @endif

            </div>


            @endforeach
        </div>

      @if (session()->has('customerId'))
      <div class="row">
        <div class="col-md-3 col-sm-3   mt-4 mb-4  text-center">
                <p class="recommends">Recommend items</p>

        </div>
    </div>

    <div class="col-md-12 col-sm-12 d-flex flex-wrap m-auto border border-3 text-light productbox">

        @foreach( $recommend as $items)
            @foreach($items as $item)
        <div class="col-md-3 col-sm-3 d-flex flex-column justify-content-center align-items-center m-auto my-3 fw-bold py-5">
           <div class="image-container">
            <img src="/storage/{{ $item->path }}" class="images" alt="bestitem1" />
           </div>
            <p class="fs-3 pt-2">{{ $item->product_name }}</p>
            <p class="fs-5"><i class="fas fa-coins me-2 coins"></i>{{ $item->coin }}  <br> <i class="fa-solid fa-money-bill money text-success"></i> {{ number_format($item->amount) }} MMK</p>
            <a href="productDetail?id={{ $item->link_id }}"><button type="button" class="btn detailbtns"> More Details</button></a>
            @if (session()->has('customerId'))
            <a href=""><button type="button" id="{{ $item->link_id }}" class="btn shopbtns shopcart" data-bs-toggle="modal" data-bs-target="#modal" >{{ __('messageMK.shopnow') }}</button></a>
            @else
            <a href="/signin"><button type="button" class="btn shopbtns">{{ __('messageMK.shopnow') }}</button></a>
            @endif
        </div>

            @endforeach
        @endforeach


    </div>
      @endif


    </div>

      {{-- start modal --}}
      <div id="modal" class="modal fade"  data-bs-backdrop="static" data-bs-keyboard="false"
      tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="col-sm-4 modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
              {{-- <div class="modal-header"> --}}

              <div class="d-flex justify-content-end ">
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
              </div>
              {{-- </div> --}}
              {{-- <div class="modal-body"> --}}
                <p class="mx-4"> <span><i class="fas fa-check-circle text-success mx-2"></i></span>A new item has been added to your Shopping Cart. You now have item in your Shopping Cart.</p>
              {{-- </div> --}}
              <div class="modal-footer">
               <a href="/cart"> <button type="button" class="btn btnCart shop" >View Shopping Cart</button></a>
                <button type="button" class="btn btnShopping" data-bs-dismiss="modal">Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
{{-- end modal --}}
    <div class="container-fluid mt-5 p-3">
        <div class="d-flex justify-content-center">
            <p class="copy">Copyright &copy; {{ $name->site_name }}</p>
        </div>
    </div>

    </section>


    <script>

            let customerId = @json(session()->has('customerId'));

        </script>
        <script src="{{ url('js/productChange.js') }}" type="text/javascript"></script>
        <script src="{{ url('js/customerShop.js') }}" type="text/javascript"></script>
@endsection
