import React from 'react'
import { Html, Head, Font, Preview, Heading, Row, Section, Text, Container, Hr } from '@react-email/components';

interface VerificationEmailProps {
    username: string,
    otp: string
}

export default function VerificationEmail({username, otp}: VerificationEmailProps) {
  return (
    <Html lang="en" dir='ltr'>
        <Head>
            <title>Verification Code</title>
            <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                    format: 'woff2',
                }}
                fontWeight={400}
                fontStyle="normal"
            />
        </Head>
        <Preview>Your LeetCode verification code: {otp}</Preview>
        <Section style={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
            <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '480px', margin: '0 auto', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                {/* Header */}
                <Section style={{ backgroundColor: '#1a1a2e', padding: '24px 32px', textAlign: 'center' as const }}>
                    <Text style={{ color: '#ffa116', fontSize: '22px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
                        &lt;/&gt; LeetCode
                    </Text>
                </Section>

                {/* Body */}
                <Section style={{ padding: '32px' }}>
                    <Heading as="h2" style={{ color: '#1a1a2e', fontSize: '20px', fontWeight: 600, margin: '0 0 16px 0' }}>
                        Hello {username},
                    </Heading>
                    <Text style={{ color: '#333', fontSize: '15px', lineHeight: '24px', margin: '0 0 24px 0' }}>
                        Thank you for registering on LeetCode. Please use the following
                        verification code to complete your registration:
                    </Text>

                    {/* OTP Box */}
                    <Section style={{ backgroundColor: '#fef7ec', border: '2px dashed #ffa116', borderRadius: '8px', padding: '20px', textAlign: 'center' as const, margin: '0 0 24px 0' }}>
                        <Text style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e', letterSpacing: '8px', margin: 0, fontFamily: 'monospace' }}>
                            {otp}
                        </Text>
                    </Section>

                    <Text style={{ color: '#666', fontSize: '13px', lineHeight: '20px', margin: '0 0 4px 0' }}>
                        This code will expire in <strong>1 hour</strong>.
                    </Text>
                    <Text style={{ color: '#999', fontSize: '13px', lineHeight: '20px', margin: 0 }}>
                        If you did not request this code, you can safely ignore this email.
                    </Text>
                </Section>

                {/* Footer */}
                <Hr style={{ borderColor: '#e5e5e5', margin: 0 }} />
                <Section style={{ padding: '20px 32px', textAlign: 'center' as const }}>
                    <Text style={{ color: '#aaa', fontSize: '12px', margin: 0 }}>
                        &copy; {new Date().getFullYear()} Leetcode Opensource &middot; Happy Coding!
                    </Text>
                </Section>
            </Container>
        </Section>
    </Html>
  );
}
