@extends('COMMON.layout.layout_customer')

@section('script')
    <script src="{{ url('js/buyCoin.js') }}" type="text/javascript" defer></script>
@endsection

@section('css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <link href="{{ url('css/buyCoin.css') }}" rel="stylesheet" type="text/css" />
@endsection

@section('title')
    {{ $name->site_name }} | Buy Coin
@endsection

@section('header')
    <section>

        <div class="container">
            <div class="coinchargeformdiv">
                <h2 class="coincharge">{{ __('messageCPPK.Coin Charge') }}</h2>
                <form action="buycoinForm" method="POST" class="coinchargeform" enctype="multipart/form-data">
                    @csrf
                    <div class="col-8 d-flex coininput">
                        <span class="col-7"><i class="coinCal fas fa-coins"></i>
                            {{ __('messageCPPK.Coin') }}</span>
                        <div class="col-7">
                            <input type="number" id="coinChargeinput" name="coinput">
                            @error('coinput')
                                <p class="text-danger">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                    <div class="col-8 d-flex choosephoto">
                        <span class="col-7"><i class="fileUpload far fa-file-alt"></i>
                            {{ __('messageCPPK.Screenshot') }}</span>
                        <div class="col-7">
                            <input class="fileuploadInput form-control" type="file" accept="image/*" id="formFile"
                                name="fileimage">
                            @error('fileimage')
                                <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    </div>
                    <button type="buttton" id="reset"
                        class="cancelbtn btn btn-light">{{ __('messageCPPK.Reset') }}</button>
                    <button type="button" id="submitbtn" class="submitbtn btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal5">{{ __('messageCPPK.Charge') }}</button>
               
            </div>
            <div class="coinrule">
                <h2 class="coinRule">{{ __('messageCPPK.Coin Rule') }}</h2>
                <ul class="coinList">
                    <li>1 coin equal <span id="coinratedata" class="coinratedata">{{ $coinrateData->rate }}</span>
                        Kyats
                    </li>
                    <li>This coin can be used only on this website</li>
                    <li>This coin cannot be transfered</li>
                </ul>
                <h2 class="coinRule">{{ __('messageCPPK.Payment Accounts') }}</h2>
                <ul class="coinList">
                    @forelse ($paymentAccount as $accounts)
                        <li>{{ $accounts->payment_name }} <span><i class="fas fa-arrow-right"></i></span>
                            {{ $accounts->account_name }}</li>
                    @empty
                    @endforelse
                </ul>
                <hr class="coinRulehr">
                <h2 class="coinCalculator">{{ __('messageCPPK.Coin Calculator') }}</h2>
                <div class="coinCaldiv">
                    <input type="number" name="" id="ccalcul" class="ccalcul" placeholder="Coin">
                    <span class="equalIcon">=</span>
                    <input type="number" name="" id="mmkcalcul" class="ccalcul" placeholder="MMK">
                </div>
            </div>
        </div>
        <br>


          {{-- start modal --}}
      <div id="modal5" class="modal fade"  data-bs-backdrop="static" data-bs-keyboard="false"
      tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="col-sm-4 modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
              {{-- <div class="modal-header"> --}}

              <div class="d-flex justify-content-end ">
                  <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
              </div>
              {{-- </div> --}}
              {{-- <div class="modal-body"> --}}
                <p id="coins" class="mx-4 text-dark "></p>
                {{-- </span>Do you want to buy <span class="coins"></span>coins for <span class="mmk"></span> MMK? --}}
              {{-- </div> --}}
              <div class="modal-footer">
                <button type="button" class="btn" data-bs-dismiss="modal" >Cancel</button>
                <button type="submit" class="btn chargeBtn" data-b>Charge</button>
              </div>
            </div>
          </div>
        </div>
    </form>


    <div id="modal5" class="modal fade"  data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="col-sm-4 modal-dialog modal-dialog-centered " role="document">
          <div class="modal-content">
            {{-- <div class="modal-header"> --}}

            <div class="d-flex justify-content-end ">
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
            </div>
            {{-- </div> --}}
            {{-- <div class="modal-body"> --}}
              <p id="coins" class="mx-4 text-dark "></p>
              {{-- </span>Do you want to buy <span class="coins"></span>coins for <span class="mmk"></span> MMK? --}}
            {{-- </div> --}}
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal" >Cancel</button>
              <button type="submit" class="btn chargeBtn" data-b>Charge</button>
            </div>
          </div>
        </div>
      </div>
{{-- end modal --}}
        <div class="copys">
            <p>Copyright &copy; {{ $name->site_name }}</p>
        </div>
    </section>
@endsection
