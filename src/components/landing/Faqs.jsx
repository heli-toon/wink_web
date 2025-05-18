export default function Faqs() {
  return (
    <>
      <section id="faq" className="faq">
        <div className="container">
          <header className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>
              Can&apos;t find what you&apos;re looking for in the FAQs? Don&apos;t worry! Our team is always available to assist you. 
              Please send us a message with your question or concern, and we&apos;ll do our best to provide a prompt and helpful response.
            </p>
          </header>
          <div className="row">
            <div className="col-lg-6">
              <div className="accordion accordion-flush" id="faqlist1">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-1">
                      How much does it cost to use Wink?
                    </button>
                  </h2>
                  <div id="faq-content-1" className="accordion-collapse collapse" data-bs-parent="#faqlist1">
                    <div className="accordion-body">It costs nothing at all.</div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-2">
                      What if I&apos;m not happy with the person who completes my
                      task?
                    </button>
                  </h2>
                  <div id="faq-content-2" className="accordion-collapse collapse" data-bs-parent="#faqlist1">
                    <div className="accordion-body">
                      Send us feedback and rate them accordingly. Rating helps
                      us to filter out the best people on the platform.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-3">
                      What types of tasks can I post on Wink?
                    </button>
                  </h2>
                  <div id="faq-content-3" className="accordion-collapse collapse" data-bs-parent="#faqlist1">
                    <div className="accordion-body">
                      Anything, from remote typing jobs to house renovations
                      to community labour.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-4">
                      What makes Wink different from other platforms?
                    </button>
                  </h2>
                  <div id="faq-content-4" className="accordion-collapse collapse" data-bs-parent="#faqlist1">
                    <div className="accordion-body">
                      Wink is a social marketplace focused on small tasks
                      making it easier to connect and interact
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="accordion accordion-flush" id="faqlist2">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2-content-1">
                      How long does it take to get my task completed?
                    </button>
                  </h2>
                  <div id="faq2-content-1" className="accordion-collapse collapse" data-bs-parent="#faqlist2">
                    <div className="accordion-body">
                      This depends on the type of tasks being done and the
                      person doing it.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2-content-2">
                      What if I don&apos;t have a computer, can I still use Wink?
                    </button>
                  </h2>
                  <div id="faq2-content-2" className="accordion-collapse collapse" data-bs-parent="#faqlist2">
                    <div className="accordion-body">
                      Wink is accessible any device with an internet
                      connection and a web browser.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2-content-3">
                      What if I have a question that&apos;s not answered here?
                    </button>
                  </h2>
                  <div id="faq2-content-3" className="accordion-collapse collapse" data-bs-parent="#faqlist2">
                    <div className="accordion-body">Leave us some feedback.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}