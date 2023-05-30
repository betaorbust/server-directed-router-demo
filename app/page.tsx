/**
 * Demo gonna demo.
 */
import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <h1>Dynecom Router Example With Server Components</h1>
            <p>
                This is a static page, but going
                <Link href="routed/flow1/mode1">here</Link> will launch the demo
            </p>
        </main>
    );
}
