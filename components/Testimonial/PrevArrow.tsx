interface CustomArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const PrevArrow = ({ className, style, onClick }: CustomArrowProps) => {
    return (
        <div
            className={className}
            style={{ ...style, display: 'block'}} // Example styling
            onClick={onClick}
        >
            <div>
                <div className="next-slick-arrow rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" /></svg>
                </div>
            </div>
        </div>
    );
};

export default PrevArrow;