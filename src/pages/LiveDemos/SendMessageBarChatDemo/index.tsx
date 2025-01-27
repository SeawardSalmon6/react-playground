import { PGHeader } from '~/components/PGHeader';
import { PGLayout } from '~/components/PGLayout';
import { MessageBar } from '~/pages/LiveDemos/SendMessageBarChatDemo/MessageBar';

export function SendMessageBarChatDemo() {
  return (
    <PGLayout>
      <PGHeader navigation={{ backTo: '/' }} title="Send Message Bar Chat Live Demo" />
      <MessageBar
      // placeholder="Type your message..."
      />
    </PGLayout>
  );
}
