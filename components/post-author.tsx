import Container from './container';
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <Container>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              {/* Avatar */}
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="inline-flex items-center justify-center">
                  <img src="/assets/avatar_photo.png"className="w-20 h-20 rounded-full mr-4" alt="avatar" />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Emanuel Casco</h2>
                  <p className="text-base">Raclette knausgaard hella meggs normcore williamsburg enamel.</p>
                </div>
              </div>
              {/* Good Bye section */}
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">Meggings portland fingerstache lyft, post-ironic fixie man bun banh mi umami everyday carry hexagon locavore direct trade art party. Locavore small batch listicle gastropub farm-to-table lumbersexual salvia messenger bag. Coloring book flannel truffaut craft beer drinking vinegar sartorial, disrupt fashion axe normcore meh butcher. Portland 90's scenester vexillologist forage post-ironic asymmetrica-.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default PostTitle
