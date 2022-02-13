import { ReactNode, useRef } from 'react';
import { InputGroup } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

type ImageUploadProps = {
	id: string;
	register: UseFormRegisterReturn;
	accept?: string;
	multiple?: boolean;
	children?: ReactNode;
};

export default function ImageUpload(props: ImageUploadProps) {
	const { register, accept, multiple, children, id } = props;
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { ref, ...rest } = register as {
		ref: (instance: HTMLInputElement | null) => void;
	};

	const handleClick = () => inputRef.current?.click();

	return (
		<InputGroup onClick={handleClick}>
			<input
				id={id}
				name='image'
				type='file'
				multiple={multiple || false}
				accept={accept}
				{...rest}
				ref={(e) => {
					ref(e);
					inputRef.current = e;
				}}
			/>
			<>{children}</>
		</InputGroup>
	);
}
