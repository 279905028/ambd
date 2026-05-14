import { useEffect } from 'react';
import { X } from 'lucide-react';
import wechatQr from '../../imports/wechat-qr.png';

export function About({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed top-6 right-6 z-[210] inline-flex items-center gap-2 px-4 py-2 transition-colors"
        style={{
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--color-border-strong)',
          background: 'var(--color-bg-elevated)',
          color: 'var(--color-fg)',
          fontSize: 'var(--text-small)',
        }}
      >
        Close <X size={14} />
      </button>

      <div className="px-6 md:px-10 pt-24 pb-32 max-w-[1400px] mx-auto">
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            fontSize: 'var(--text-mono)',
            letterSpacing: 'var(--text-mono--letter-spacing)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'var(--color-fg-subtle)' }}>(02)</span>
          <span style={{ color: 'var(--color-fg-muted)' }}>about</span>
        </div>

        <h1
          className="mb-12 max-w-[60rem]"
          style={{
            fontSize: 'var(--text-h1)',
            lineHeight: 'var(--text-h1--line-height)',
            letterSpacing: 'var(--text-h1--letter-spacing)',
            fontWeight: 'var(--text-h1--font-weight)' as any,
          }}
        >
          A independent design studio{' '}
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--color-fg-muted)',
            }}
          >
            — based in China.
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-24">
          <div className="md:col-span-7">
            <p
              className="mb-8"
              style={{
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--text-body--line-height)',
                color: 'var(--color-fg-muted)',
                fontFamily: 'var(--font-cjk)',
              }}
            >
              我们是一家专注于品牌识别、艺术指导与空间叙事的独立设计工作室。
              我们与初创团队、文化机构以及成长型企业合作，将策略思考与视觉语言结合，
              为每一个项目寻找真正属于它的表达方式。
            </p>
            <p
              style={{
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--text-body--line-height)',
                color: 'var(--color-fg-muted)',
                fontFamily: 'var(--font-cjk)',
              }}
            >
              We are an independent design studio working at the intersection of
              brand identity, art direction, and spatial storytelling.
              We collaborate with founders, cultural institutions, and growing
              companies to find each project its own voice.
            </p>
          </div>

          
        </div>

        <div
          className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div className="md:col-span-7">
            <div
              style={{
                fontSize: 'var(--text-mono)',
                letterSpacing: 'var(--text-mono--letter-spacing)',
                textTransform: 'uppercase',
                color: 'var(--color-fg-subtle)',
                marginBottom: '1.5rem',
              }}
            >
              Get in touch
            </div>
            <h2
              className="mb-8 max-w-[36rem]"
              style={{
                fontSize: 'var(--text-h2)',
                lineHeight: 'var(--text-h2--line-height)',
                letterSpacing: 'var(--text-h2--letter-spacing)',
                fontWeight: 'var(--text-h2--font-weight)' as any,
              }}
            >
              Have a project in mind?{' '}
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: 'var(--color-fg-muted)',
                }}
              >
                Let's talk.
              </span>
            </h2>
            <ul className="space-y-3">
              {[
                { k: 'Email', v: 'ambdes@163.com', href: 'mailto:ambdes@163.com' },
                { k: 'WeChat', v: '13115831126' },
                { k: 'Instagram', v: '@ambd.studio' },
              ].map((it) => (
                <li key={it.k} className="flex items-baseline gap-6">
                  <span
                    style={{
                      fontSize: 'var(--text-mono)',
                      letterSpacing: 'var(--text-mono--letter-spacing)',
                      textTransform: 'uppercase',
                      color: 'var(--color-fg-subtle)',
                      width: '6rem',
                      flexShrink: 0,
                    }}
                  >
                    {it.k}
                  </span>
                  {it.href ? (
                    <a
                      href={it.href}
                      className="link-underline"
                      style={{
                        fontSize: 'var(--text-body)',
                        color: 'var(--color-fg)',
                      }}
                    >
                      {it.v}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: 'var(--text-body)',
                        color: 'var(--color-fg)',
                      }}
                    >
                      {it.v}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <div
              style={{
                fontSize: 'var(--text-mono)',
                letterSpacing: 'var(--text-mono--letter-spacing)',
                textTransform: 'uppercase',
                color: 'var(--color-fg-subtle)',
                marginBottom: '1.5rem',
              }}
            >
              WeChat / 微信
            </div>
            <div
              className="aspect-square w-full max-w-[280px] flex items-center justify-center"
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-fg-subtle)',
              }}
            >
              <img
                src={wechatQr}
                alt="WeChat QR Code"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <p
              className="mt-4"
              style={{
                fontSize: 'var(--text-small)',
                color: 'var(--color-fg-muted)',
                fontFamily: 'var(--font-cjk)',
              }}
            >
              扫码添加微信，备注「合作」即可。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
