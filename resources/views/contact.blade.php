@include('head')
@include('header')
<!-- ======= Contact Section ======= -->
<section id="contact" class="contact">
      <div class="container">

        <div class="section-header">
          <h2>Kontak Kami</h2>
          <p>Hubungi kami jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut.</p>
        </div>

      </div>

      <div class="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.802000945929!2d106.8363593!3d-6.1572673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4459bd72655%3A0xd23ee0aa58216cee!2sPt.%20Satu%20Anugrah%20Solusindo!5e0!3m2!1sid!2sid!4v1697440000944!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <!-- End Google Maps-->

      <div class="container">

        <div class="row gy-5 gx-lg-5">

          <div class="col-lg-4">

            <div class="info">
              <h3>ALAMAT</h3>
              <p>Jangan ragu untuk menghubungi kami jika Anda ingin berbicara lebih lanjut tentang layanan kami.</p>

              <div class="info-item d-flex">
                <i class="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h4>Lokasi:</h4>
                  <p>Jl. Kartini Raya No.16, RT.13/RW.5, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710</p>
                </div>
              </div><!-- End Info Item -->

              <div class="info-item d-flex">
                <i class="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h4>Email:</h4>
                  <p>rico@satu-tech.com</p>
                </div>
              </div><!-- End Info Item -->

              <div class="info-item d-flex">
                <i class="bi bi-phone flex-shrink-0"></i>
                <div>
                  <h4>Telephone:</h4>
                  <p>+62811-9722-305</p>
                </div>
              </div><!-- End Info Item -->

            </div>

          </div>

        <div class="col-lg-8">
        <form role="form" class="php-email-form">
            <div class="row">
                <div class="col-md-6 form-group">
                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required>
                </div>
            </div>
            <div class="form-group mt-3">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required>
            </div>
            <div class="form-group mt-3">
                <textarea class="form-control" name="message" placeholder="Message" required></textarea>
            </div>
            <div class="text-center">
                <!-- Ganti alamat email di bawah ini dengan alamat email tujuan Anda -->
                <a href="#" onclick="openMailApp()">
                    <button type="submit">Send Message</button>
                </a>
            </div>
        </form>

        </div>
<!-- End Contact Form -->

        </div>

      </div>
    </section><!-- End Contact Section -->
    @include('footer')
    @include('script')
